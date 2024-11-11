import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { act } from 'react'; 
import * as authContext from '../../context/authContext';

jest.mock('../../context/authContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../form/Select', () => {
  return function DummySelect({ label }) {
    return <div data-testid={`select-${label.toLowerCase()}`}>{label} Select</div>;
  };
});

jest.mock('./HomeSinLog', () => {
  return function DummyHomeSinLog() {
    return <div data-testid="home-sin-log">HomeSinLog</div>;
  };
});

// Definición de variables mock
const mockGastos = [
  {
    id: 1,
    importe: 15000,
    detalle: "Compra de supermercado",
    dia: "01",
    mes: "09",
    anio: "2024",
    nombreGastoId: 1,
    tipoGastoId: 1,
    usuarioId: "user123"
  },
  {
    id: 2,
    importe: 35000,
    detalle: "Pago de alquiler",
    dia: "05",
    mes: "09",
    anio: "2024",
    nombreGastoId: 2,
    tipoGastoId: 1,
    usuarioId: "user123"
  }
];

const mockIngresos = [
  {
    id: 1,
    importe: 100000,
    dia: "01",
    mes: "09",
    anio: "2024",
    nombreIngresoId: 1,
    tipoIngresoId: 1,
    usuarioId: "user123"
  },
  {
    id: 2,
    importe: 50000,
    dia: "15",
    mes: "09",
    anio: "2024",
    nombreIngresoId: 2,
    tipoIngresoId: 1,
    usuarioId: "user123"
  }
];

const mockUser = {
  id: "user123",
  nombre_Usuario: "John Doe",
  nombre: "John Doe",
  mail: "john.doe@example.com",
  fotoPerfil: "https://example.com/profile.jpg"
};

// Proveer mock para useAuth
beforeEach(() => {
  authContext.useAuth.mockReturnValue({
    user: mockUser,
    gastos: mockGastos,
    ingresos: mockIngresos,
    nombreGastos: [
      { id: 1, nombre: "Alimentación" },
      { id: 2, nombre: "Vivienda" },
      { id: 3, nombre: "Transporte" }
    ],
    nombreIngresos: [
      { id: 1, nombre: "Salario" },
      { id: 2, nombre: "Freelance" },
      { id: 3, nombre: "Inversiones" }
    ],
    loading: false,
    authloading: false
  });
});

describe('Home Component', () => {
  test('renders without crashing', () => {
    act(() => {
      render(<Home />);
    });

    expect(screen.getByText(/INFORME DE/)).toBeInTheDocument();
  });

  test('displays month and year selects', () => {
    render(<Home />);
    expect(screen.getByTestId('select-mes')).toBeInTheDocument();
    expect(screen.getByTestId('select-año')).toBeInTheDocument();
  });

  test('displays balance, income, and expenses sections', () => {
    render(<Home />);
    expect(screen.getByText(/BALANCE/)).toBeInTheDocument();
    expect(screen.getByText(/INGRESOS/)).toBeInTheDocument();
    expect(screen.getByText(/GASTOS/)).toBeInTheDocument();
  });


  

  test('displays HomeSinLog when user is not authenticated', () => {
    // Modificar el valor del mock para simular el estado no autenticado
    authContext.useAuth.mockReturnValue({
      user: null,
      gastos: mockGastos,
      ingresos: mockIngresos,
      nombreGastos: [],
      nombreIngresos: [],
      loading: false,
      authloading: false
    });

    render(<Home />);
    expect(screen.getByText(/HomeSinLog/)).toBeInTheDocument();
  });
});
