$(document).ready(function(){

	currentId = null; // current task id
	name = null; // current task name
	priority = null; // current task priority

	// -------------- Reorder tasks ----------------------
	$('#tasks-table tbody').sortable({
	  update: function( event, ui ) {
	  	var rows = $('#tasks-table tbody tr').get();

		$('#table-loading').fadeIn(10); // show loading image
		
		// ----- Reduce opacity and change background while reordering rows
		$('#tasks-table tbody tr').css('opacity', 0.4);
		$('#tasks-table tbody tr').css('background','rgba(204,204,204,0.5)');

	  	data = [];
	  	// ----- Re-number priority (tasks)
		$.each(rows, function(index, row) {
			$(row).children('.priority').text(index + 1);
			data.push({
				'_id' : $(row).attr('data-id'), 
				'priority' : index + 1 
			});
		});

		// ----- Save tasks with new priority order
		$.ajax({
			url: 'reorderTasks',
			type: "post",
			dataType: 'JSON',
			data: {	'data': data,
					'_token' : $('#addForm input[name=_token]').val()
				},
			success: function(data){
				console.log('REORDER: ');
				console.log(data);
			},
			error: function(data){
				$('#error-msg-1').fadeIn().delay(5000).fadeOut();
			},
			complete: function(data){
				$('#table-loading').fadeOut(10); // hide loading image

				// set opacity default and background default when reordering is finished. 
				$('#tasks-table tbody tr').css('opacity', 1);
				$('#tasks-table tbody tr').css('background','#fff');
			}
		}); // $.ajax({

	  },
	  start: function( event, ui ) {
		$('#tasks-table tbody').sortable( "disable" );			
	  },
	  stop: function( event, ui ) {
		$('#tasks-table tbody').sortable( "enable" );			
	  }

	});

	$('#tasks-table tbody').disableSelection();		


	// ----------------- Submit Form ------------------
	$('#addButton').click(function(){ 

		// Get project id and news task name
		name = $('input[name=name]').val().trim();
		project_id = $('select[name=pname]').val();

		// Set priority to new task
		priority = parseInt( $('#tasks-table tbody tr:last-child')
								.find('.priority').text() );
		priority = priority	? priority + 1	: 1 ;

		// --- Validate Project 
		if ( project_id == null || project_id == 0 ){
			alert('Please, Pick a Project... ');
			return false;	  		
		}

		// --- Validate task name
		if ( name == null || name == '' ){
			alert('Task name can not be empty');
			return false;
		}

		$('#loading-img').fadeIn(); // show loading image
		$('#addButton').addClass('disabled'); // disable button

		// --- save new task.
		$.ajax({
			url: 'task',
			type: "post",
			dataType: 'JSON',
			data: {	'_id': '',
					'name' : name, 
					'priority' : priority, 
					'project_id' : project_id,
					'createdOn' : moment().format('lll'),
					'_token' : $('#addForm input[name=_token]').val()
				},
			success: function(data){
				// --- add new task to DOM
				$('#notasks').remove();
				$('#tasks-table tbody').append(
					'<tr width="100%" data-id="'+data._id+'" style="opacity: 1; background: rgb(255, 255, 255);" >' +
						'<td width="45%" class="name">' + data.name + '</td>' +
						'<td width="15%" class="priority text-center">' + data.priority + '</td>' +
						'<td width="25%" class="text-center">' + data.created_at + '</td>' + 						
						'<td width="15%" class="text-center">' +
							'<a href="#" class="editTaskLink" data-id="' + data._id + '"><i class="fa fa-pencil" aria-hidden="true"></i></a>' + 
							'<a href="#" class="deleteTaskLink" data-id="' + data._id + '"><i class="fa fa-trash" aria-hidden="true"></i></a> ' +
							'<a href="#" class="updateTaskLink" data-id="' + data._id + '"><i class="fa fa-check" aria-hidden="true"></i></a>' + 
							'<a href="#" class="cancelTaskLink" data-id="' + data._id + '"><i class="fa fa-times" aria-hidden="true"></i></a> ' + 
						'</td>' +
					'</tr>'
				).fadeIn(100);

				// --- reset task fields
				$('input[name=name]').val('');
				$('input[name=priority]').val('');

			},
			error: function(data){
				$('#error-msg-1').fadeIn().delay(5000).fadeOut();
			},
			complete: function(data){
				$('#loading-img').fadeOut(); // hide loading image
				$('#addButton').removeClass('disabled'); // enable button											
			}			

		}); // $.ajax({
    return false;

	}); // $('#addButton').click(function(){ 


	// ------------ Refresh tasks on project selection ---------------
	$("#pname").change(function() {

		$('#table-loading').fadeIn(10); // show loading image
		
		// ----- Reduce opacity and change background while getting tasks
		$('#tasks-table tbody tr').css('opacity', 0.5);
		$('#tasks-table tbody tr').css('background','rgba(204,204,204,0.5)');

		project_id = $('select[name=pname]').val(); // Get project id.

		// --- get tasks 
		$.ajax({
			url: 'tasks',
			type: "GET",
			dataType: 'JSON',
			data: {	'project_id' : project_id,
					'_token' : $('#addForm input[name=_token]').val()
			},
			success: function(rows){

				// --- remove old tasks from DOM
				$('#notasks').remove();
				$('#tasks-table tbody tr').remove();

				// --- add new tasks to DOM
				if( rows.data.length ){
					$.each(rows.data, function(index, row) {
						$('#tasks-table tbody').append(
							'<tr width="100%" data-id="'+ row._id +'">' +
								'<td width="45%" class="name">' + row.name + '</td>' +
								'<td width="15%" class="priority text-center">' + row.priority + '</td>' +
								'<td width="25%" class="text-center">' + row.created_at + '</td>' + 						
								'<td width="15%" class="text-center">' +
									'<a href="#" class="editTaskLink" data-id="' + row._id + '"><i class="fa fa-pencil" aria-hidden="true"></i></a> ' + 
									'<a href="#" class="deleteTaskLink" data-id="' + row._id + '"><i class="fa fa-trash" aria-hidden="true"></i></a> ' +
									'<a href="#" class="updateTaskLink" data-id="' + row._id + '"><i class="fa fa-check" aria-hidden="true"></i></a> ' + 
									'<a href="#" class="cancelTaskLink" data-id="' + row._id + '"><i class="fa fa-times" aria-hidden="true"></i></a> ' + 
								'</td>' +
							'</tr>'
						); // append
					}); // $.each		
				}else{
					// --- add if no tasks
					$('#tasks-table tbody').append(
						'<tr>' +
							'<td colspan="6" class="text-center" id="notasks">' +
							'	<h4>No Tasks</h4>' +
							'</td>' +
						'</tr>'
					); // append
				} // if

			},
			error: function(data){
				$('#tasks-table tbody tr').remove();
				$('#tasks-table tbody').append(
							'<tr width="100%">' +
							'	<td colspan="6" class="text-center" id="notasks">' +
							'		<h4>No Tasks</h4>' +
							'	</td>' +
							'</tr>'
				);
				$('#error-msg-1').fadeIn().delay(3000).fadeOut();
			},
			complete: function(data){
				$('#table-loading').fadeOut(10); // hide loading image

				// set opacity default and background default when loading is finished.
				$('#tasks-table tbody tr').css('opacity', 1);
				$('#tasks-table tbody tr').css('background','#fff');

				// remove "Pick a project" option from project select
				$('#pname').find('option:first[value=0]').remove();
			}			

		}); // $.ajax({

	}); // $("#pname").change


	// ----------------- Delete Task --------------------
	$('#tasks-table').on("click", ".deleteTaskLink", function(){

		areYouSure = confirm('Are you sure?');

		if( areYouSure ){
			currentId = $(this).attr("data-id"); // get current task id
			currentRow = $('#tasks-table tr[data-id=' + currentId + ']'); // get current row			

			// ----- Reduce opacity and change background while deleting tasks
			$(currentRow).css('opacity', 0.5);
			$(currentRow).css('background','rgba(204,204,204,0.5)');

			// --- delete task
			$.ajax({
				url: 'task',
				type: "DELETE",
				dataType: 'JSON',
				data: {	'_id' : currentId, 
						'_token' : $('#addForm input[name=_token]').val()
					},
				success: function(data){
					// remove task from DOM
					$("#tasks-table tr[data-id='" + currentId + "']").remove()

					// if no tasks are left
					if( $("#tasks-table tr[data-id]").length == 0 ){

						$('#tasks-table tbody').append(
							'<tr width="100%">' +
							'	<td colspan="6" class="text-center" id="notasks">' +
							'		<h4>No Tasks</h4>' +
							'	</td>' +
							'</tr>'
						);
					} // if
				}, // success
				error: function(data){
					$('#error-msg-1').fadeIn().delay(3000).fadeOut();
 
 					// set opacity default and background default when deleting is finished.
					$(currentRow).css('opacity', 1);
					$(currentRow).css('background','#fff');
				},
				complete: function(data){
					$('#loading-img').fadeOut(); // hide loading image
				}			

			}); // ajax      					
		} // if

		return false;

	}); // $('#tasks-table').on("click"

	// ----------------- Edit Task --------------------
	$('#tasks-table').on("click", ".editTaskLink", function(){

		// get current task id and name  
		currentId = $(this).attr("data-id");
		name = $("#tasks-table tr[data-id='" + currentId + "']").find(".name").text().trim();

		// add task name input field to DOM
		$("#tasks-table tr[data-id='" + currentId + "'] .name")
			.html('<input id="newName" name="name" type="text" value="'+ name +'" width="100%">').focus();

		// hide edit and delete action links 
		$(".editTaskLink[data-id='" + currentId + "']").css('display','none');
		$(".deleteTaskLink[data-id='" + currentId + "']").css('display','none');

		// show update and cancel action links
		$(".updateTaskLink[data-id='" + currentId + "']").css('display','inline');
		$(".cancelTaskLink[data-id='" + currentId + "']").css('display','inline');

		$( "#newName" ).focus(); // move focus to task name field		

		return false;

	}); // $('#tasks-table').on("click",

	// ----------------- Update Task --------------------
	$('#tasks-table').on("click", ".updateTaskLink", function(){

		// disable input while saving
		$('#newName').attr('disabled','disabled');  

		currentId = $(this).attr("data-id"); // get current task id		

		// get task name and priority
		newName = $("#newName").val();
		priority = $("#tasks-table tr[data-id='" + currentId + "']").find(".priority").text().trim();

		// --- save task new data
		$.ajax({
			url: 'task',
			type: "PUT",
			dataType: 'JSON',
			data: {	'_id' : currentId, 
					'name' : newName, 
					'priority' : priority, 
					'_token' : $('#addForm input[name=_token]').val()
				},
			success: function(data){
				// update DOM with new task name 
				$('#tasks-table tr[data-id="' + currentId + '"] .name')
					.html(data.name);
			}, // success
			error: function(data){
				$('#error-msg-1').fadeIn().delay(3000).fadeOut();
				$('#tasks-table tr[data-id="' + currentId + '"] .name')
					.html(name);
			},
			complete: function(data){
				$('#loading-img').fadeOut(); // hide loading image
				$('#notasks').remove();

				// show edit and delete action links
				$('.editTaskLink').css('display','inline');
				$('.deleteTaskLink').css('display','inline');

				// hide update and cancel action links				
				$('.updateTaskLink').css('display','none');
				$('.cancelTaskLink').css('display','none');				
			}						

		}); // ajax

		return false;

	}); // $('#tasks-table').on("click",

	// ----------------- Cancel Task Edit --------------------
	$('#tasks-table').on("click", ".cancelTaskLink", function(){
		
		// get current task id and update DOM
		currentId = $(this).attr("data-id");
		$('#tasks-table tr[data-id="' + currentId + '"] .name')
				.html(name);

		// show edit and delete action links				
		$('.editTaskLink').css('display','inline');
		$('.deleteTaskLink').css('display','inline');

		// hide update and cancel action links		
		$('.updateTaskLink').css('display','none');
		$('.cancelTaskLink').css('display','none');

		return false;

	}); // $('#tasks-table').on("click",


}); // $(document).ready(function()
