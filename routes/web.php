<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TicketController::class, 'create'])->name('tickets.create');
Route::post('/support', [TicketController::class, 'store'])->name('tickets.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/admin/tickets/{id}', [AdminController::class, 'show'])->name('admin.tickets.show');
    Route::put('/admin/tickets/{id}', [AdminController::class, 'update'])->name('admin.tickets.update');
});

require __DIR__ . '/settings.php';
