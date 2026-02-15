/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Validate input
  if (!passenger || typeof passenger !== 'object') return "INVALID PASS";
  if (!passenger.name || typeof passenger.name !== 'string' || !passenger.name.trim()) return "INVALID PASS";
  if (!passenger.from || typeof passenger.from !== 'string' || !passenger.from.trim()) return "INVALID PASS";
  if (!passenger.to || typeof passenger.to !== 'string' || !passenger.to.trim()) return "INVALID PASS";
  if (!passenger.classType || typeof passenger.classType !== 'string') return "INVALID PASS";
  
  const classTypeLower = passenger.classType.toLowerCase();
  if (classTypeLower !== 'first' && classTypeLower !== 'second') return "INVALID PASS";
  
  // Helper function to convert to title case
  const toTitleCase = (str) => {
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  
  // Generate pass details
  const nameUpper = passenger.name.toUpperCase();
  const fromTitle = toTitleCase(passenger.from);
  const toTitle = toTitleCase(passenger.to);
  const classUpper = classTypeLower.toUpperCase();
  
  // Generate Pass ID
  const classChar = classUpper.charAt(0);
  const fromChars = passenger.from.toUpperCase().slice(0, 3);
  const toChars = passenger.to.toUpperCase().slice(0, 3);
  const passId = classChar + fromChars + toChars;
  
  // Return formatted pass
  return `MUMBAI LOCAL PASS\n---\nName: ${nameUpper}\nFrom: ${fromTitle}\nTo: ${toTitle}\nClass: ${classUpper}\nPass ID: ${passId}`;
}
