// Mobile S - 320px
// Mobile M - 375px
// Mobile L - 425px
// Tablet - 768px
// Laptop - 1024px
// Laptop L - 1440px
// 4K - 2560px

const size = {
  mobileS: "350px",
  mobile: "500px",
  tablet: "900px",
  laptopS: "1024px",
  laptopL: "1440px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${ size.tablet })`,
  laptopS: `(max-width: ${ size.laptopS })`,
  laptopL: `(max-width: ${ size.laptopL })`,
};
