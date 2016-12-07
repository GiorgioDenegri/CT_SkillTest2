<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

	protected $table = 'projects';

	protected $primaryKey = '_id';

	protected $fillable = [
		'name'
	];	

	/**
	 * Get all tasks 
	 *
	 * @return array
	 */
	public function tasks()
    {
        return $this->hasMany('App\Task');
    }

}
