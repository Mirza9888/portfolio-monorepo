<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // ... existing code ...
        
        // Update DuckDNS IP every 3 days
        $schedule->command('duckdns:update')->dailyAt('00:00')->everyThreeDays();
    }

    // ... existing code ...
} 