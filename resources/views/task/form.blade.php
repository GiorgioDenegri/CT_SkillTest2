
<div class="row">

	<div class="form-group col-sm-3" id="select-project-container">

		{!! Form::label('pname', 'Project Name: ') !!}
		{!!	Form::select('pname', $projects, null,array('class' => 'form-control') ) !!}

	</div>

	<div class="form-group col-sm-4" id="add-task-container">

		{!! Form::label('name', 'Task Name: ') !!}
		{!! Form::text('name', null, ['class' => 'form-control','required' => 'required']) !!}

	</div>

	<div class="form-group col-sm-2">

		{{-- Form::label('priority', 'Priority: ') --}}
		{{-- Form::text('priority', null, ['class'=>'form-control','required'=>'required' ]) --}}

	</div>

	<div class="col-sm-3"></div>

</div> <!-- .row -->

<div class="row">

	<div class="col-sm-6" id="add-task-container">

		{!! Form::button( 'Add Task', ['class'=>' btn btn-primary', 'id' => 'addButton'] ) !!}
		&nbsp;<img id="loading-img" src="images/ajax-loader.gif" width="34" height="34" style="padding: 8px; display:none;">
		<span id="error-msg-1">Something went wrong...</span>

	</div>
		
</div> <!-- .row -->





