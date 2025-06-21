<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Spatie\DiscordAlerts\Facades\DiscordAlert;

class OrderCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(protected $order)
    {
        $order = $this->order->loadMissing('orderItemsWithProduct', 'customer');

        $description = "";

        foreach ($order->orderItemsWithProduct as $item) {
            $description .= "- {$item->product->name} (x{$item->quantity})\n";
        }

        DiscordAlert::message("**{$order->customer->name}** đã đặt hàng", [
            [
                'title' => "Mã đơn hàng: #{$order->id}",
                'description' => $description,
            ]
        ]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
