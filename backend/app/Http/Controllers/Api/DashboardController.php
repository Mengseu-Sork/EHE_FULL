<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\NewsArticle;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Visitor;
use App\Models\Video;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->get('year', now()->year);

        $dashboardChart = [];

        for ($month = 1; $month <= 12; $month++) {

            $dashboardChart[] = [
                "month" => date("M", mktime(0, 0, 0, $month, 1)),
                "visitors" => Visitor::whereYear("created_at", $year)
                    ->whereMonth("created_at", $month)
                    ->count(),

                "news" => NewsArticle::whereYear("created_at", $year)
                    ->whereMonth("created_at", $month)
                    ->count(),
            ];
        }

        return response()->json([
            "projects" => Project::count(),
            "supporters" => Partner::count(),
            "histories" => History::count(),
            "videos" => Video::count(),
            "news" => NewsArticle::count(),

            "total_visitors" => Visitor::count(),
            "today_visitors" => Visitor::whereDate("created_at", today())->count(),
            "this_month_visitors" => Visitor::whereYear("created_at", now()->year)
                ->whereMonth("created_at", now()->month)
                ->count(),

            "dashboard_chart" => $dashboardChart,
        ]);
    }
}
