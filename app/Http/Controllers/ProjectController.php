<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Request;

use App\Project;

class ProjectController extends Controller {

	public function __construct()
	{
	}

	/**
	 * Show task list (GET).
	 * @return Response
	 */
	public function index()
	{
		$projects = Project::orderBy('pname', 'ASC')
						->paginate( env('ITEMS_PER_PAGE') );

		return response()->json($projects);
	}

}

