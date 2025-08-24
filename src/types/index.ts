// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Authentication types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Meal and Nutrition types
export interface MealRequest {
  dish_name: string;
  servings: number;
}

export interface Macronutrients {
  per_serving: {
    protein_g: number;
    fat_g: number;
    carbohydrates_g: number;
    fiber_g: number;
  };
  total: {
    protein_g: number;
    fat_g: number;
    carbohydrates_g: number;
    fiber_g: number;
  };
}

export interface MealResponse {
  dish_name: string;
  servings: number;
  serving_size_g: number;
  calories_per_serving: number;
  total_calories: number;
  macronutrients: Macronutrients;
  source: string;
}

// API Error types
export interface ApiError {
  error: string;
  details?: any[];
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

// Form data types (for zod inference)
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface MealFormData {
  dish_name: string;
  servings: number;
}

// Store types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export interface MealResult {
  id: string;
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
  timestamp: string;
}

export interface MealState {
  currentResult: MealResult | null;
  mealHistory: MealResult[];
  isLoading: boolean;
  error: string | null;
  setCurrentResult: (result: MealResult) => void;
  addToHistory: (result: MealResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearCurrentResult: () => void;
}

// Legacy store interfaces (for backward compatibility)
export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export interface MealStore {
  meals: MealResponse[];
  currentMeal: MealResponse | null;
  loading: boolean;
  error: string | null;
  searchMeal: (dish_name: string, servings: number) => Promise<void>;
  clearError: () => void;
  addMeal: (meal: MealResponse) => void;
  removeMeal: (index: number) => void;
  clearMeals: () => void;
}

// Component prop types
export interface AuthFormProps {
  type: 'login' | 'register';
  onSuccess?: () => void;
}

export interface MealFormProps {
  onSubmit?: (result: MealResponse) => void;
}

export interface ResultCardProps {
  meal: MealResponse;
  onSave?: () => void;
  onRemove?: () => void;
  showActions?: boolean;
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<any>;
  requiresAuth?: boolean;
}

// Environment types
export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  environment: 'development' | 'production' | 'test';
  debug: boolean;
}
