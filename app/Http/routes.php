<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/','TaskController@index');

Route::get('/tasks','TaskController@index');
Route::post('/task','TaskController@store');
Route::delete('/task','TaskController@destroy');
Route::put('/task','TaskController@update');

Route::post('/reorderTasks','TaskController@reorderTasks');

Route::get('/projects','ProjectController@index');
