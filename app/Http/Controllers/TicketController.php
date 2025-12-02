<?php

namespace App\Http\Controllers;

use App\Enums\TicketType;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function create()
    {
        return Inertia::render('support/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'email' => 'required|email',
            'type' => ['required', 'string'],
            'description' => 'required|string',
        ]);

        $ticketEnum = TicketType::tryFrom($request->input('type'));

        if (!$ticketEnum) {
            return back()->withErrors(['type' => 'Invalid ticket type']);
        }

        $connection = $ticketEnum->getConnectionName();

        $ticket = new Ticket();
        $ticket->setConnection($connection);
        $ticket->fill($validated);
        $ticket->save();

        return back()->with('success', "Ticket successfully filed to the {$connection} department!");
    }
}
