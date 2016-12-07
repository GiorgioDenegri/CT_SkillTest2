	<br/>

	<div class="row">
		<div class="col-sm-12">

			<div id="table-loading">
				<img id="loading-img" src="images/ajax-loader.gif" 
					width="20" height="20">
			</div>

			<table id="tasks-table"class="table table-bordered table-responsive table-hover">
			<thead>
		        <tr>
		          <th width="45%" class="text-center">Task Name</th>
		          <th width="15%" class="text-center">Priority</th>
		          <th width="25%" class="text-center">Date/time Submitted</th>
		          <th width="15%" class="text-center">Actions</th>		          
		    	</tr>
	      	</thead>
	      	<tbody>

			@if( count($tasks) )

				@foreach( $tasks as $task )
				<tr width="100%" data-id="{{ $task->_id }}">
					<td width="45%" class="name"> {{ $task->name }} </td>
					<td width="15%" class="priority text-center"> {{ $task->priority }} </td>
					<td width="25%" class="text-center"> 
						{{-- $task->created_at --}}
						{{ date('M d, Y / H:i:s', strtotime($task->created_at)) }}
					</td>				
					<td width="15%" class="text-center">
						<a href="#" class="editTaskLink" data-id="{{ $task->_id }}"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;
						<a href="#" class="deleteTaskLink" data-id="{{ $task->_id }}"><i class="fa fa-trash" aria-hidden="true"></i></a>
						<a href="#" class="updateTaskLink" data-id="{{ $task->_id }}"><i class="fa fa-check" aria-hidden="true"></i></a>&nbsp;&nbsp;
						<a href="#" class="cancelTaskLink" data-id="{{ $task->_id }}"><i class="fa fa-times" aria-hidden="true"></i></a>
					</td>
				</tr>
				@endforeach

			@else

				<tr>
					<td colspan="6" class="text-center" id="notasks">
						<h4>No Tasks</h4>					
					</td>
				</tr>

			@endif
			</tbody>			
			</table>

		</div> <!-- .col -->
	</div> <!-- .row -->