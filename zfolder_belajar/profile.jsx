import './index.css'

// Data untuk daftar keahlian (skills)
const skills = [
  // { skill: 'HTML+CSS', emoji: '💪', color: '#2662EA' },
  // { skill: 'JavaScript', emoji: '💪', color: '#EFD81D' },
  // { skill: 'Web Design', emoji: '💪', color: '#C3DCAF' },
  // { skill: 'Git and GitHub', emoji: '👍', color: '#E84F33' },
  // { skill: 'React', emoji: '👍', color: '#61DAFB' },
  // { skill: 'Svelte', emoji: '😍', color: '#FF3E00' },
  { skill: 'HTML+CSS', level: 'advanced', color: '#2662EA' },
  { skill: 'JavaScript', level: 'advanced', color: '#EFD81D' },
  { skill: 'Web Design', level: 'advanced', color: '#C3DCAF' },
  { skill: 'Git and GitHub', level: 'intermediate', color: '#E84F33' },
  { skill: 'React', level: 'intermediate', color: '#61DAFB' },
  { skill: 'Svelte', level: 'beginner', color: '#FF3E00' },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  )
}

function Avatar() {
  // Lokasi gambar sesuai dengan path yang Anda berikan
  return <img
            className="avatar"
            src="profiles/wilson.jpg"
            alt="Jonas Schmedtmann"
          />;
}

function Intro() {
  return (
    <div>
      <h1>Jonas Schmedtmann</h1>
      <p>
        Full-stack web developer and teacher at Udemy.
        When not coding or preparing a course, I like to play board games, to cook (and eat),
        or to just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skillObj={skill} key={skill.skill} />
      ))}
    </div>
  );
}

function Skill({ skillObj }) {
  // Menentukan warna teks berdasarkan warna latar belakang
  const textColor = skillObj.color === '#EFD81D'
                  || skillObj.color === '#C3DCAF'
                  || skillObj.color === '#61DAFB' ? '#000' : '#FFF';
  
  return (
    <div className="skill" style={{ backgroundColor: skillObj.color, color: textColor }}>
      <span>{skillObj.skill}</span>
      <span>
        {skillObj.level === 'advanced' && '💪'}
        {skillObj.level === 'intermediate' && '👍'}
        {skillObj.level === 'beginner' && '👶'}
      </span>
    </div>
  );
}

export default App;