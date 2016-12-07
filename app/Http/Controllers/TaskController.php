<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Request;

use App\Task;
use App\Project;

class TaskController extends Controller {

	public function __construct()
	{
	}

	/**
	 * Show task list (GET).
	 * @return Response
	 */
	public function index(Request $request)
	{
		//dd($request);
		if(Request::ajax()) {
			$project_id = Input::get('project_id');
			$tasks = Task::where('project_id', $project_id )
						->orderBy('priority', 'ASC')
						->orderBy('created_at', 'ASC')
						->paginate( env('ITEMS_PER_PAGE') );
			return response()->json($tasks);
		}else{
			$projects =  ['0' => 'Pick a Project...'] + 
						Project::lists('pname', '_id');

			reset($projects); // to get first array index

			$tasks = Task::where('project_id', key($projects) )
						->orderBy('priority', 'ASC')
						->orderBy('created_at', 'ASC')
						->paginate( env('ITEMS_PER_PAGE') );

			return view('task.index', compact('tasks','projects'));			
		}
	} // function

	/**
	 * Submit form to store a new task (POST).
	 *
	 * @param  App\Http\Requests\Request $request
	 * @return Response (json)
	 */
	public function store( Request $request)
	{
		$request = Input::except('_token');

		if(Request::ajax()) {
			$task = new Task();
			try{				
				$create = $task->create($request);
				if( $create ){
					return response()->json($create);
				}else{
					return '{"error":"we have an error"}';
				}		
			} catch (\Exception $e) {
				return '{"error":"we have an error"}';
			}
		} // if

	} // function


	/**
	 * Sumit form to edit a task.(PUT / PATCH)
	 *
	 * @param  
	 * @return Response (JSON)
	 */
	public function update()
	{
		if(Request::ajax()) {
			$task = Task::find( Input::get('_id') );

			$task->name = Input::get('name');
			$task->priority = Input::get('priority');

			try {			
				$update = $task->update();
				if( $update ){
					return response()->json($task);
				}else{
					return '{"error":"we have an error 1"}';
				}		
			} catch (\Exception $e) {
				return $e;
			}
		} // if	
	} // function


	/**
	 * Reorder tasks.(PUT / PATCH)
	 *
	 * @param  
	 * @return Response (JSON)
	 */
	public function reorderTasks()
	{
		if(Request::ajax()) {
			$task = new Task();
			foreach (Input::get('data') as $row)
			{
				$task = Task::find( $row['_id'] );
				$task->priority = $row['priority'];
				$task->save();
			}
			return response()->json('{"msg":"ok"}');
		} // if
	}  // function


	/**
	* Delete a task (DELETE).
	*
	* @param  
	* @return Response
	*/
	public function destroy()
	{
		if(Request::ajax()) {
			$task = Task::find( Input::get('_id') );
			try {			
				$delete = $task->delete();
				if( $delete ){
					return response()->json($delete);
				}else{
					return '{"error":"we have an error 1"}';
				}		
			} catch (\Exception $e) {
				return $e;
			}
		} // if
	} // function

} // class TaskController
