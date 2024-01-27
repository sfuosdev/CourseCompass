import React from "react";

export const depts = [
  { text: "ACMA", value: "acma", name: "Actuarial Mathematics" },
  { text: "ALS", value: "als", name: "Applied Legal Studies" },
  { text: "APMA", value: "apma", name: "Applied Mathematics" },
  { text: "ARCH", value: "arch", name: "Archaeology" },
  { text: "BISC", value: "bisc", name: "Biological Sciences" },
  {
    text: "BPK",
    value: "bpk",
    name: "Biomedical Physiology and Kinesiology",
  },
  { text: "BUS", value: "bus", name: "Business Administration" },
  { text: "CA", value: "ca", name: "Contemporary Arts" },
  { text: "CHEM", value: "chem", name: "Chemistry" },
  { text: "CHIN", value: "chin", name: "Chinese" },
  { text: "CMNS", value: "cmns", name: "Communication" },
  { text: "CMPT", value: "cmpt", name: "Computing Science" },
  { text: "COGS", value: "cogs", name: "Cognitive Science" },
  { text: "CRIM", value: "crim", name: "Criminology" },
  { text: "DIAL", value: "dial", name: "Dialogue" },
  { text: "DMED", value: "dmed", name: "Digital Media" },
  { text: "EASC", value: "easc", name: "Earth Sciences" },
  { text: "ECO", value: "eco", name: "Ecological Restoration" },
  { text: "ECON", value: "econ", name: "Economics" },
  { text: "EDPR", value: "edpr", name: "Education Professional" },
  { text: "EDUC", value: "educ", name: "Education" },
  { text: "ENGL", value: "engl", name: "English" },
  { text: "ENSC", value: "ensc", name: "Engineering Science" },
  { text: "ENV", value: "env", name: "Environment" },
  { text: "EVSC", value: "evsc", name: "Environmental Science" },
  { text: "FAL", value: "fal", name: "Foundations of Academic Literacy" },
  {
    text: "FAN",
    value: "fan",
    name: "Foundations of Analytical and Quantitative Reasoning",
  },
  {
    text: "FASS",
    value: "fass",
    name: "Faculty of Arts and Social Sciences",
  },
  { text: "FEP", value: "fep", name: "Exchange Study" },
  { text: "FREN", value: "fren", name: "French" },
  { text: "GA", value: "ga", name: "Global Asia" },
  { text: "GEOG", value: "geog", name: "Geography" },
  { text: "GERM", value: "germ", name: "German" },
  { text: "GERO", value: "gero", name: "Gerontology" },
  { text: "GRAD", value: "grad", name: "Graduate" },
  {
    text: "GSWS",
    value: "gsws",
    name: "Gender Sexuality and Women's Studies",
  },
  { text: "HIST", value: "hist", name: "History" },
  { text: "HSCI", value: "hsci", name: "Health Sciences" },
  { text: "HUM", value: "hum", name: "Humanities" },
  { text: "IAT", value: "iat", name: "Interactive Arts and Technology" },
  { text: "INDG", value: "indg" },
  { text: "INLG", value: "inlg" },
  {
    text: "INS",
    value: "ins",
    name: "Individualized Interdisciplinary Studies",
  },
  { text: "IS", value: "is", name: "International Studies" },
  { text: "ITAL", value: "ital", name: "Italian" },
  { text: "JAPN", value: "japn", name: "Japanese" },
  { text: "LBRL", value: "lbrl", name: "Liberal Arts" },
  { text: "LBST", value: "lbst", name: "Labour Studies" },
  { text: "LING", value: "ling", name: "Linguistics" },
  { text: "LS", value: "ls", name: "Liberal Studies" },
  {
    text: "MACM",
    value: "macm",
    name: "Mathematics and Computing Science",
  },
  { text: "MATH", value: "math", name: "Mathematics" },
  { text: "MBB", value: "mbb", name: "Molecular Biology and Biochemistry" },
  { text: "MSE", value: "mse", name: "Mechatronic Systems Engineering" },
  { text: "NEUR", value: "neur", name: "Neuroscience" },
  { text: "NUSC", value: "nusc", name: "Nuclear Science" },
  { text: "ONC", value: "onc", name: "Oncology" },
  { text: "PERS", value: "pers", name: "Persian" },
  { text: "PHIL", value: "phil", name: "Philosophy" },
  { text: "PHYS", value: "phys", name: "Physics" },
  { text: "PLAN", value: "plan", name: "Planning" },
  { text: "PLCY", value: "plcy", name: "Public Policy" },
  { text: "POL", value: "pol", name: "Political Science" },
  { text: "PSYC", value: "psyc", name: "Psychology" },
  { text: "PUB", value: "pub", name: "Publishing" },
  { text: "PUNJ", value: "punj", name: "Punjabi" },
  {
    text: "REM",
    value: "rem",
    name: "Resource and Environmental Management",
  },
  { text: "SA", value: "sa", name: "Sociology and Anthropology" },
  { text: "SD", value: "sd", name: "Sustainable Development" },
  { text: "SDA", value: "sda" },
  { text: "SEE", value: "see", name: "Sustainable Energy Engineering" },
  { text: "SPAN", value: "span", name: "Spanish" },
  { text: "STAT", value: "stat", name: "Statistics" },
  { text: "TEKX", value: "tekx", name: "Technology - FAS" },
  { text: "URB", value: "urb", name: "Urban Studies" },
  { text: "WL", value: "wl", name: "World Literature" },
];

const Page = () => {
  return (
    <div className="m-[20px]">
      <h1 className="text-3xl">
        Select the department you would like to see courses from:
      </h1>
      <div className="mt-5 flex flex-col md:flex-row md:items-start">
        {/* Courses Section */}
        <div className="md:w order-2 md:order-1 mt-5 md:mt-0">
          <div className="flex flex-wrap gap-4">
            {depts.map((dept) => {
              return (
                <a href={`courses/${dept.value}`} key={dept.value}>
                  <h3 className="underline underline-offset-4 text-lg m-y-5 text-[#4570E6]">
                    {dept.name}
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
