<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {

	protected $table = 'tasks';

	protected $primaryKey = '_id';

	protected $fillable = [
		'name',
		'priority',
		'project_id'
	];	

	public function project(){
		return $this->belongsTo('App\Project');
	}

}
