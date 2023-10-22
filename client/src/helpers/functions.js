export const getRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postRequest = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const putRequest = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDateFromDatetime = (datetime) => {
  return datetime.slice(0, datetime.indexOf("T"));
};

export const formatDateYYYYMMDD = (datetime) => {
  const date = getDateFromDatetime(datetime);
  return date.split("-").reverse().join(".");
};

export const formatTime = (time) => {
  if (isNaN(time) || !time) return "00";
  return time <= 9 ? `0${time}` : time;
};

export const truncate = (str, n, useWordBoundary) => {
  if (str == null) {
    return "";
  }
  if (str.length <= n) {
    return str;
  }
  const subString = str.substring(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substring(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};

export const getTimeSum = (arr) => {
  let totalHours = 0;
  let totalMinutes = 0;

  for (const entry of arr) {
    totalHours += entry.hours;
    totalMinutes += entry.mins;
  }

  if (totalMinutes >= 60) {
    const extraHours = Math.floor(totalMinutes / 60);
    totalHours += extraHours;
    totalMinutes %= 60;
  }
  const totalTime = { hours: totalHours, mins: totalMinutes };
  return totalTime;
};

export const getTimeDiff = (time1, time2) => {
  const totalMinutes1 = time1.hours * 60 + time1.mins;
  const totalMinutes2 = time2.hours * 60 + time2.mins;

  const differenceMinutes = totalMinutes1 - totalMinutes2;
  const resultMinutes = Math.max(0, differenceMinutes);

  const resultHours = Math.floor(resultMinutes / 60);
  const resultRemainingMinutes = resultMinutes % 60;

  return { hours: resultHours, mins: resultRemainingMinutes };
}