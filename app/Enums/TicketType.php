<?php

namespace App\Enums;

enum TicketType: string
{
    case TECH = 'Technical Issues';
    case BILLING = 'Account & Billing';
    case PRODUCT = 'Product & Service';
    case GENERAL = 'General Inquiry';
    case FEEDBACK = 'Feedback & Suggestions';

    // This method decides which Database Connection to use
    public function getConnectionName(): string
    {
        return match ($this) {
            self::TECH => 'technical',
            self::BILLING => 'billing',
            self::PRODUCT => 'product',
            self::GENERAL => 'general',
            self::FEEDBACK => 'feedback',
        };
    }
}
