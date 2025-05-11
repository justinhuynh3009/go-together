<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_categories', function (Blueprint $table) {
            $table->id('id');
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('menu_items', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('category_id')->constrained('menu_categories');
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('cost', 10, 2)->nullable();
            $table->integer('preparation_time')->nullable()->comment('in minutes');
            $table->boolean('is_available')->default(true);
            $table->string('image_url')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('category_id');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id('id');
            $table->integer('order_type')->default(0)->comment('0: dine-in, 1: takeaway, 2: delivery');
            $table->integer('status')->default(0)->comment('0: pending, 1: in progress, 2: completed, 3: cancelled');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->integer('payment_status')->default(0)->comment('0: unpaid, 1: paid, 2: refunded');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('order_id')->constrained('orders');
            $table->foreignId('menu_item_id')->constrained('menu_items');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->text('special_instructions')->nullable();
            $table->integer('status')->default(0)->comment('0: pending, 1: in progress, 2: completed, 3: cancelled');
            $table->timestamps();

            $table->index('order_id');
            $table->index('menu_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(['order_items', 'orders', 'menu_items', 'menu_categories']);
    }
};
