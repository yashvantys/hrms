import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: unknown; output: unknown; }
};

export type Attendance = {
  __typename?: 'Attendance';
  checkIn?: Maybe<Scalars['String']['output']>;
  checkOut?: Maybe<Scalars['String']['output']>;
  date: Scalars['String']['output'];
  employee?: Maybe<Employee>;
  employeeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  remarks?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AttendanceStatus>;
};

export enum AttendanceStatus {
  Absent = 'ABSENT',
  HalfDay = 'HALF_DAY',
  Late = 'LATE',
  Leave = 'LEAVE',
  Present = 'PRESENT'
}

export type AttendanceSummary = {
  __typename?: 'AttendanceSummary';
  absent: Scalars['Int']['output'];
  employeeId: Scalars['Int']['output'];
  halfDay: Scalars['Int']['output'];
  late: Scalars['Int']['output'];
  leave: Scalars['Int']['output'];
  month: Scalars['String']['output'];
  present: Scalars['Int']['output'];
  totalDays: Scalars['Int']['output'];
};

export type ContextResponse = {
  __typename?: 'ContextResponse';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
};

export type CreateAttendanceInput = {
  checkIn?: InputMaybe<Scalars['String']['input']>;
  checkOut?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['String']['input'];
  employeeId: Scalars['Int']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AttendanceStatus>;
};

export type CreateDepartmentInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  departmentId: Scalars['Int']['input'];
  designation: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  joiningDate: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export type DeleteDepartmentResponse = {
  __typename?: 'DeleteDepartmentResponse';
  deletedId?: Maybe<Scalars['ID']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteEmployeeResponse = {
  __typename?: 'DeleteEmployeeResponse';
  deletedId?: Maybe<Scalars['ID']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employees: Array<Employee>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  department?: Maybe<Department>;
  departmentId: Scalars['Int']['output'];
  designation: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeCode: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  joiningDate?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Float']['output']>;
};

export type EmployeeConnection = {
  __typename?: 'EmployeeConnection';
  edges: Array<EmployeeEdge>;
  pageInfo: PageInfo;
};

export type EmployeeEdge = {
  __typename?: 'EmployeeEdge';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type EmployeeSearchInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<EmployeeSortInput>;
};

export enum EmployeeSortField {
  Email = 'EMAIL',
  EmployeeCode = 'EMPLOYEE_CODE',
  FirstName = 'FIRST_NAME',
  JoiningDate = 'JOINING_DATE',
  LastName = 'LAST_NAME'
}

export type EmployeeSortInput = {
  field: EmployeeSortField;
  order?: InputMaybe<SortOrder>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkIn: Attendance;
  checkOut: Attendance;
  createAttendance: Attendance;
  createDepartment: Department;
  createEmployee: Employee;
  createUser: User;
  deleteDepartment: DeleteDepartmentResponse;
  deleteEmployee: DeleteEmployeeResponse;
  login: LoginResponse;
  saveAttendance: Attendance;
  updateDepartment: Department;
  updateEmployee: Employee;
};


export type MutationCheckInArgs = {
  employeeId: Scalars['Int']['input'];
};


export type MutationCheckOutArgs = {
  employeeId: Scalars['Int']['input'];
};


export type MutationCreateAttendanceArgs = {
  input: CreateAttendanceInput;
};


export type MutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSaveAttendanceArgs = {
  date: Scalars['String']['input'];
  employeeId: Scalars['Int']['input'];
  status: AttendanceStatus;
};


export type MutationUpdateDepartmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDepartmentInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEmployeeInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  department?: Maybe<Department>;
  departments: Array<Department>;
  employee?: Maybe<Employee>;
  employees: EmployeeConnection;
  getAttendanceByDate: Array<Attendance>;
  getAttendanceByEmployee: Array<Attendance>;
  getAttendanceByEmployeeId: Array<Attendance>;
  getAttendanceById: Attendance;
  getAttendanceSummary: AttendanceSummary;
  health: Scalars['String']['output'];
  me?: Maybe<ContextResponse>;
};


export type QueryDepartmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeesArgs = {
  input: EmployeeSearchInput;
};


export type QueryGetAttendanceByDateArgs = {
  date: Scalars['String']['input'];
};


export type QueryGetAttendanceByEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
  fromDate: Scalars['String']['input'];
  toDate: Scalars['String']['input'];
};


export type QueryGetAttendanceByEmployeeIdArgs = {
  employeeId: Scalars['Int']['input'];
};


export type QueryGetAttendanceByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetAttendanceSummaryArgs = {
  employeeId: Scalars['Int']['input'];
  month: Scalars['String']['input'];
};

export enum Role {
  Admin = 'Admin',
  Employee = 'Employee',
  Hr = 'HR',
  Manager = 'Manager'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateDepartmentInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Attendance: ResolverTypeWrapper<Attendance>;
  AttendanceStatus: AttendanceStatus;
  AttendanceSummary: ResolverTypeWrapper<AttendanceSummary>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ContextResponse: ResolverTypeWrapper<ContextResponse>;
  CreateAttendanceInput: CreateAttendanceInput;
  CreateDepartmentInput: CreateDepartmentInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteDepartmentResponse: ResolverTypeWrapper<DeleteDepartmentResponse>;
  DeleteEmployeeResponse: ResolverTypeWrapper<DeleteEmployeeResponse>;
  Department: ResolverTypeWrapper<Department>;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeConnection: ResolverTypeWrapper<EmployeeConnection>;
  EmployeeEdge: ResolverTypeWrapper<EmployeeEdge>;
  EmployeeSearchInput: EmployeeSearchInput;
  EmployeeSortField: EmployeeSortField;
  EmployeeSortInput: EmployeeSortInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Role: Role;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateDepartmentInput: UpdateDepartmentInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attendance: Attendance;
  AttendanceSummary: AttendanceSummary;
  Boolean: Scalars['Boolean']['output'];
  ContextResponse: ContextResponse;
  CreateAttendanceInput: CreateAttendanceInput;
  CreateDepartmentInput: CreateDepartmentInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  DeleteDepartmentResponse: DeleteDepartmentResponse;
  DeleteEmployeeResponse: DeleteEmployeeResponse;
  Department: Department;
  Employee: Employee;
  EmployeeConnection: EmployeeConnection;
  EmployeeEdge: EmployeeEdge;
  EmployeeSearchInput: EmployeeSearchInput;
  EmployeeSortInput: EmployeeSortInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  Mutation: Record<PropertyKey, never>;
  PageInfo: PageInfo;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  UpdateDepartmentInput: UpdateDepartmentInput;
  UpdateEmployeeInput: UpdateEmployeeInput;
  User: User;
};

export type AttendanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attendance'] = ResolversParentTypes['Attendance']> = {
  checkIn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  checkOut?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  remarks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['AttendanceStatus']>, ParentType, ContextType>;
};

export type AttendanceSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttendanceSummary'] = ResolversParentTypes['AttendanceSummary']> = {
  absent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  halfDay?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  late?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  leave?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  present?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ContextResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContextResponse'] = ResolversParentTypes['ContextResponse']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteDepartmentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteDepartmentResponse'] = ResolversParentTypes['DeleteDepartmentResponse']> = {
  deletedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type DeleteEmployeeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteEmployeeResponse'] = ResolversParentTypes['DeleteEmployeeResponse']> = {
  deletedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Array<ResolversTypes['Employee']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  departmentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  designation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employeeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  joiningDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type EmployeeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeConnection'] = ResolversParentTypes['EmployeeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['EmployeeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type EmployeeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeEdge'] = ResolversParentTypes['EmployeeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Employee'], ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  checkIn?: Resolver<ResolversTypes['Attendance'], ParentType, ContextType, RequireFields<MutationCheckInArgs, 'employeeId'>>;
  checkOut?: Resolver<ResolversTypes['Attendance'], ParentType, ContextType, RequireFields<MutationCheckOutArgs, 'employeeId'>>;
  createAttendance?: Resolver<ResolversTypes['Attendance'], ParentType, ContextType, RequireFields<MutationCreateAttendanceArgs, 'input'>>;
  createDepartment?: Resolver<ResolversTypes['Department'], ParentType, ContextType, RequireFields<MutationCreateDepartmentArgs, 'input'>>;
  createEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationCreateEmployeeArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteDepartment?: Resolver<ResolversTypes['DeleteDepartmentResponse'], ParentType, ContextType, RequireFields<MutationDeleteDepartmentArgs, 'id'>>;
  deleteEmployee?: Resolver<ResolversTypes['DeleteEmployeeResponse'], ParentType, ContextType, RequireFields<MutationDeleteEmployeeArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  saveAttendance?: Resolver<ResolversTypes['Attendance'], ParentType, ContextType, RequireFields<MutationSaveAttendanceArgs, 'date' | 'employeeId' | 'status'>>;
  updateDepartment?: Resolver<ResolversTypes['Department'], ParentType, ContextType, RequireFields<MutationUpdateDepartmentArgs, 'id' | 'input'>>;
  updateEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationUpdateEmployeeArgs, 'id' | 'input'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, RequireFields<QueryDepartmentArgs, 'id'>>;
  departments?: Resolver<Array<ResolversTypes['Department']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryEmployeeArgs, 'id'>>;
  employees?: Resolver<ResolversTypes['EmployeeConnection'], ParentType, ContextType, RequireFields<QueryEmployeesArgs, 'input'>>;
  getAttendanceByDate?: Resolver<Array<ResolversTypes['Attendance']>, ParentType, ContextType, RequireFields<QueryGetAttendanceByDateArgs, 'date'>>;
  getAttendanceByEmployee?: Resolver<Array<ResolversTypes['Attendance']>, ParentType, ContextType, RequireFields<QueryGetAttendanceByEmployeeArgs, 'employeeId' | 'fromDate' | 'toDate'>>;
  getAttendanceByEmployeeId?: Resolver<Array<ResolversTypes['Attendance']>, ParentType, ContextType, RequireFields<QueryGetAttendanceByEmployeeIdArgs, 'employeeId'>>;
  getAttendanceById?: Resolver<ResolversTypes['Attendance'], ParentType, ContextType, RequireFields<QueryGetAttendanceByIdArgs, 'id'>>;
  getAttendanceSummary?: Resolver<ResolversTypes['AttendanceSummary'], ParentType, ContextType, RequireFields<QueryGetAttendanceSummaryArgs, 'employeeId' | 'month'>>;
  health?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['ContextResponse']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Attendance?: AttendanceResolvers<ContextType>;
  AttendanceSummary?: AttendanceSummaryResolvers<ContextType>;
  ContextResponse?: ContextResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteDepartmentResponse?: DeleteDepartmentResponseResolvers<ContextType>;
  DeleteEmployeeResponse?: DeleteEmployeeResponseResolvers<ContextType>;
  Department?: DepartmentResolvers<ContextType>;
  Employee?: EmployeeResolvers<ContextType>;
  EmployeeConnection?: EmployeeConnectionResolvers<ContextType>;
  EmployeeEdge?: EmployeeEdgeResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

