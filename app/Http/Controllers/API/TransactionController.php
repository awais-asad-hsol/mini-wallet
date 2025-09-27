<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $transactions = Transaction::with(['sender:id,name,email','receiver:id,name,email'])
            ->where(function($q) use ($user) {
                $q->where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id);
            })
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json([
            'balance' => $user->balance,
            'transactions' => $transactions,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'receiver_id' => 'required|integer|exists:users,id|not_in:'.$user->id,
            'amount' => 'required|numeric|min:0.01'
        ]);

        $commission = round($data['amount'] * 0.015, 2);
        $totalDebited = $data['amount'] + $commission;

        return DB::transaction(function () use ($user, $data, $commission, $totalDebited) {
            // lock sender row for update
            $sender = User::where('id', $user->id)->lockForUpdate()->first();

            if ($sender->balance < $totalDebited) {
                return response()->json(['error' => 'Insufficient balance'], 422);
            }

            // update balances
            $sender->balance -= $totalDebited;
            $sender->save();

            $receiver = User::where('id', $data['receiver_id'])->lockForUpdate()->first();
            $receiver->balance += $data['amount'];
            $receiver->save();

            // record transaction
            $tx = Transaction::create([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'amount' => $data['amount'],
                'commission_fee' => $commission,
                'total_debited' => $totalDebited,
                'status' => 'completed',
            ]);

            return response()->json([
                'message' => 'Transfer successful',
                'balance' => $sender->balance,
                'transaction' => $tx,
            ], 200);
        });
    }

}
