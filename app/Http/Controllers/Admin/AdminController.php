<?php

namespace App\Http\Controllers\Admin;

use App\Enums\TicketType;
use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $allTickets = collect();

        foreach (TicketType::cases() as $type) {
            $connName = $type->getConnectionName();

            $tickets = Ticket::on($connName)->orderBy('created_at', 'desc')->get();

            $tickets->each(function ($ticket) use ($connName) {
                $ticket->source_database = $connName;
            });

            $allTickets = $allTickets->merge($tickets);
        }

        return Inertia::render('admin/dashboard', [
            'tickets' => $allTickets,
        ]);
    }

    public function show(Request $request, $id)
    {
        $db = $request->query('db');

        if (!\in_array($db, ['technical', 'billing', 'product', 'general', 'feedback'])) {
            abort(404);
        }

        $ticket = Ticket::on($db)->findOrFail($id);

        return Inertia::render('admin/show', [
            'ticket' => $ticket,
            'db' => $db,
        ]);
    }

    public function update(Request $request, $id)
    {
        $db = $request->input('source_database');

        $ticket = Ticket::on($db)->findOrFail($id);

        $ticket->update([
            'admin_note' => $request->input('admin_note'),
            'status' => 'Noted',
        ]);

        return redirect()->route('dashboard')->with('success', 'Ticket updated');
    }
}
