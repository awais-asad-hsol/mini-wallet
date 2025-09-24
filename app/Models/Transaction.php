<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'sender_id','receiver_id','amount','commission_fee','total_debited','status'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'commission_fee' => 'decimal:2',
        'total_debited' => 'decimal:2',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}