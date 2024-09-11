const getStartAndEndDate = (date?: Date | string | null) => {
  const inputDate = date? new Date(date) : new Date();
  const startDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
  const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);

  return {startDate: convertDate(startDate), endDate: convertDate(endDate)}
}

const convertDate = (inputDate: Date, combination?: string | null) => {
  if (!combination || typeof(combination) === 'undefined')
		  combination = "-"
  return `${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`
}