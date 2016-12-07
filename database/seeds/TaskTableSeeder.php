<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class TaskTableSeeder extends Seeder{
	public function run(){

		DB::table('tasks')->delete();

		$tasks = array(
			array(
				// id = 1
				'name' => 'Get specs from the client.',
				'priority' => 1,
				'project_id' => 1,
				'created_at' => '2015-05-01 10:00:00'
				),
			array(
				// id = 2
				'name' => 'Draw IOS wireframes',
				'priority' => 2,
				'project_id' => 1,
				'created_at' => '2015-05-01 10:05:00'				
				),
			array(
				// id = 3
				'name' => 'Show wireframes to the client',
				'priority' => 3,
				'project_id' => 1,
				'created_at' => '2015-05-01 10:10:00'				
				),


			array(
				// id = 4
				'name' => 'Choose server and DB',
				'priority' => 1,
				'project_id' => 2,
				'created_at' => '2015-05-01 10:20:00'				
				),
			array(
				// id = 5
				'name' => 'List endpoints',
				'priority' => 2,
				'project_id' => 2,
				'created_at' => '2015-05-01 10:30:00'				
				),
			array(
				// id = 5
				'name' => 'Other task',
				'priority' => 3,
				'project_id' => 2,
				'created_at' => '2015-05-01 10:35:00'				
				),				


			array(
				// id = 6
				'name' => 'Analisys information',
				'priority' => 1,
				'project_id' => 3,
				'created_at' => '2015-05-01 11:10:00'				
				),
			array(
				// id = 6
				'name' => 'Develop software',
				'priority' => 2,
				'project_id' => 3,
				'created_at' => '2015-05-01 11:10:00'				
				),				
			array(
				// id = 6
				'name' => 'Testing software',
				'priority' => 3,
				'project_id' => 3,
				'created_at' => '2015-05-01 11:10:00'				
				),				


			array(
				// id = 7
				'name' => 'Draw Android Wireframes',
				'priority' => 1,
				'project_id' => 4,
				'created_at' => '2015-05-01 10:20:00'				
				),
			array(
				// id = 8
				'name' => 'Prepare Mockups',
				'priority' => 2,
				'project_id' => 4,
				'created_at' => '2015-05-01 10:25:00'				
				)

		);

		DB::table('tasks')->insert($tasks);
	}
}

?>