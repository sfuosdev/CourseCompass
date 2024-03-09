import Link from 'next/link';
import { faculties } from '@/utils/faculties';

const Home = () => {
  return (
    <div>
      <h1>Faculties and Departments</h1>
      {faculties.map((faculty) => (
        <div key={faculty.name}>
          <h2 className='text-2xl font-bold mb-2'>{faculty.name}</h2>
          <div className="flex flex-wrap">
            {faculty.schools &&
              faculty.schools.map((school) => (
                <Link
                  key={school.departments[0]}
                  href={`/courses/${params.dept}/${course.courseCode}`}                >
                  <p>
                    <button className='border rounded-md p-2 bg-primary-blue text-white hover:bg-primary-yellow hover:text-black'>{school.departments}</button>
                  </p>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
