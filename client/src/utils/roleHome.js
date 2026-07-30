// Where each role lands after login / when hitting a page they can't access.
export function roleHome(role) {
  if (role === "student") return "/student-dashboard";
  return "/dashboard";
}
