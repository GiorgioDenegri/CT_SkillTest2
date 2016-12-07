<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ProjectTableSeeder extends Seeder{
	public function run(){

		DB::table('projects')->delete();

		$projects = array(
			array(
				// id = 1
				'pname' => 'Project IOS App',
				'created_at' => '2015-05-01 10:00:00'
				),
			array(
				// id = 2
				'pname' => 'Project API',
				'created_at' => '2015-05-01 10:05:00'
				),			
			array(
				// id = 3
				'pname' => 'Project Desktop App',
				'created_at' => '2015-05-01 10:10:00'
				),						
			array(
				// id = 4
				'pname' => 'Project Web App',
				'created_at' => '2015-05-01 10:15:00'
				),										
			array(
				// id = 5
				'pname' => 'Project Android App',
				'created_at' => '2015-05-01 10:20:00'
				)												
		);

		DB::table('projects')->insert($projects);
	}
}

?>