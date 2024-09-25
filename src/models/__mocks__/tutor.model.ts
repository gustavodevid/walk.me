const mockTutors = [
    {
        tutorId: '1',
        email: 'tutor1@example.com',
        nome: 'Tutor 1',
        senha: 'hashed_password',
        pets: [],
        save: jest.fn(),
        destroy: jest.fn(),
    },
];

const Tutor = {
    findAll: jest.fn().mockResolvedValue(mockTutors),
    findOne: jest.fn().mockResolvedValue(mockTutors[0]),
    create: jest.fn().mockImplementation((data) => {
        return { ...data, tutorId: '2' }; 
    }),
    destroy: jest.fn().mockResolvedValue(1), 
};

export default Tutor;
