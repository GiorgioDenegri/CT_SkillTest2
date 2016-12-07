@extends('app')

@section('content')

<div class="container">

	<div class="row">
		<div class="col-sm-12">
			<h2 id="app-title"><i class="fa fa-tasks" aria-hidden="true">
				</i>&nbsp;&nbsp;Task Manager
			</h2>
		</div>
	</div> <!-- .row -->	

	{!! Form::open( ['url'=>'task', 'method'=>'POST' , 'id' => 'addForm']) !!}

		@include('task.form')		

	{!! Form::close() !!}	

	 @include('task.table')

</div> <!-- .container -->

@endsection