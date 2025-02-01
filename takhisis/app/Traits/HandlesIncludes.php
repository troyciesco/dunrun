<?php

namespace App\Traits;

trait HandlesIncludes {
  protected function getRequestedIncludes(): array {
    if (!request()->has('include')) {
      return [];
    }

    $includes = explode(',', request()->get('include'));
    return array_intersect($includes, $this->allowedIncludes ?? []);
  }
}
