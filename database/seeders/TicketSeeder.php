<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Enums\TicketType;
use Faker\Factory as Faker;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (TicketType::cases() as $ticketEnum) {
            $connectionName = $ticketEnum->getConnectionName();

            $this->command->info("Seeding 5 tickets into connection: {$connectionName}...");

            for ($i = 0; $i < 5; $i++) {
                $ticket = new Ticket();

                $ticket->setConnection($connectionName);

                $ticket->fill([
                    'customer_name' => $faker->name,
                    'email' => $faker->unique()->safeEmail,
                    'type' => $ticketEnum->value,
                    'description' => $faker->paragraph(2),
                    'status' => 'New',
                    'admin_note' => null,
                ]);

                $ticket->save();
            }
        }
    }
}
