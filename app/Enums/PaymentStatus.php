<?php

namespace App\Enums;

enum PaymentStatus: int
{
    case UNPAID = 0;
    case PAID = 1;
    case REFUNDED = 2;

    public function label(): string
    {
        return match($this) {
            self::UNPAID => 'Unpaid',
            self::PAID => 'Paid',
            self::REFUNDED => 'Refunded',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::UNPAID => 'bg-yellow-100 text-yellow-800',
            self::PAID => 'bg-green-100 text-green-800',
            self::REFUNDED => 'bg-red-100 text-red-800',
        };
    }

    public function toArray(): array
    {
        return [
            'value' => $this->value,
            'label' => $this->label(),
            'color' => $this->color(),
        ];
    }

    // Optional: Helper method to get all cases with labels
    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->label()
        ])->toArray();
    }
}
