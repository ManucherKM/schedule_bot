export function GroupNameHelper(group: string): string {
  let res: string = group;

  if (group[0] === "0") {
    res = group.slice(1);
  }

  return res;
}
