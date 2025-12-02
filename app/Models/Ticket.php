<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket query()
 * @mixin \Eloquent
 */
class Ticket extends Model
{
    protected $guarded = [];

    protected $appends = ['source_database'];

    protected ?string $source_database = null;

    public function getSourceDatabaseAttribute()
    {
        return $this->source_database;
    }

    public function setSourceDatabaseAttribute($value)
    {
        $this->source_database = $value;
    }

    protected $fillable = ['customer_name', 'email', 'type', 'description', 'status', 'admin_note'];
}
