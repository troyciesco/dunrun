<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDungeonRequest;
use App\Http\Requests\UpdateDungeonRequest;
use App\Models\Dungeon;
use App\Traits\ApiResponses;

class DungeonController extends Controller {
    use ApiResponses;
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return $this->ok('hi index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return $this->ok('hi create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDungeonRequest $request) {
        return $this->ok('hi store');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dungeon $dungeon) {
        return $this->ok('hi show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dungeon $dungeon) {
        return $this->ok('hi edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDungeonRequest $request, Dungeon $dungeon) {
        return $this->ok('hi update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dungeon $dungeon) {
        return $this->ok('hi destroy');
    }
}
