<?php

namespace App\Traits;

trait ApiResponses {
  protected function ok($data) {
    return $this->success($data);
  }

  protected function success($data, $statusCode = 200) {
    return response()->json([
      'data' => $data,
    ], $statusCode);
  }
}
