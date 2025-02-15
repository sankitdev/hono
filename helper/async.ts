export const asyncHandler =
  (fn: any) => async (req: any, res: any, next: any) =>
    await Promise.resolve(fn(req, res, next)).catch(function (error) {
      const errorMessage = error ? error.message : 'Something went wrong';
      res.status(500).json({
        errorMessage,
        error,
        data: null,
        success: false,
      });
    });
