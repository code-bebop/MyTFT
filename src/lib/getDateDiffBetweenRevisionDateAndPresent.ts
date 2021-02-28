const getDateDiffBetweenRevisionDateAndPresent = (
  revisionDate: number
): number =>
  Math.ceil(
    (new Date().getTime() - new Date(revisionDate).getTime()) /
      (1000 * 3600 * 24)
  );

export default getDateDiffBetweenRevisionDateAndPresent;
