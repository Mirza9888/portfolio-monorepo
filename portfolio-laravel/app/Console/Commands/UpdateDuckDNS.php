<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateDuckDNS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'duckdns:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update DuckDNS IP address';

    private $domain = 'mirzaredzic';
    private $token = '1e345912-e2bf-4166-b9f0-a28487a64b67';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $response = Http::get("https://www.duckdns.org/update", [
                'domains' => $this->domain,
                'token' => $this->token,
                'ip' => ''
            ]);

            if ($response->successful()) {
                $this->info('DuckDNS IP updated successfully');
                Log::info('DuckDNS IP updated successfully');
            } else {
                $this->error('Failed to update DuckDNS IP');
                Log::error('Failed to update DuckDNS IP', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
            }
        } catch (\Exception $e) {
            $this->error('Error updating DuckDNS IP: ' . $e->getMessage());
            Log::error('Error updating DuckDNS IP', [
                'error' => $e->getMessage()
            ]);
        }
    }
}
