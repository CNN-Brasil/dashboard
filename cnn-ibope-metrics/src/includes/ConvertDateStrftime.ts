
class ConvertDateStrftime {
  convertDate(date: string): number {
    const strftime = ((new Date(`${this.getCurrentDate()} ${date}`).getTime()) / 1000);
    return strftime;
  }

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    let date: any = `${mm}/${dd}/${yyyy}`;
    
    return date;
  }

  getDiffBetweenHours(current: number, newTime: number): number {
    const currentDiff = new Date(current * 1000).getHours();
    const newTimeDiff = new Date(newTime * 1000).getHours();
    const hourDiff = (currentDiff - newTimeDiff);

    return hourDiff;
  }

}

export { ConvertDateStrftime }