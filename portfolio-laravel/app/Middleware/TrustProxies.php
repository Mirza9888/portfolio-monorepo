<?php


namespace App\Http\Middleware;

use Illuminate\Http\Request;

class TrustProxies
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string
     */
    protected $proxies;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers = Request::HEADER_X_FORWARDED_FOR; 

    public function __construct()
    {
        // Ako koristiš više proxy servera, postavi odgovarajući IP ili wildcard (*)
        $this->proxies = env('TRUSTED_PROXIES', '*');
    }

    public function handle(Request $request, \Closure $next)
    {
        return $next($request);
    }
}
