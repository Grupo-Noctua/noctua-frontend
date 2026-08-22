export type Project = {
  id: string
  nome: string
  cliente: string
  status: 'Em dia'|'Em risco'|'Atrasado'|'Concluído'
  progresso: number
  orcamento: number
  gasto: number
  deadline: string
  fase: string
  equipe: string[]
}

export type Employee = {
  id: string
  nome: string
  cargo: string
  departamento: string
  projectId?: string
  disponibilidade: number
  dataIngresso: string
  localizacao: string
}

export type Tool = {
  id: string
  ferramenta: string
  categoria: string
  subcategoria: string
  usoPorProjeto: Record<string,0|1|2|3>
}

export const employees: Employee[] = Array.from({length:15}).map((_,i)=>({
  id: `u${i+1}`,
  nome: ['Ana Silva','Bruno Costa','Carla Maia','Diego Rocha','Eduardo Lima','Fernanda Dias','Gustavo Nunes','Helena Pinto','Igor Santos','Juliana Moraes','Karim Souza','Lucas Alves','Mariana Reis','Nicolas Prado','Olivia Castro'][i],
  cargo: ['Analista','Desenvolvedor','Designer','Engenheiro de Dados','Gerente de Projeto'][i%5],
  departamento: ['TI','Dados','Design','Infra','Consultoria'][i%5],
  projectId: i<10? `p${(i%6)+1}`: undefined,
  disponibilidade: [90,70,50,100,30,80,60,40,20,75,55,85,65,45,95][i],
  dataIngresso: `202${i%3+1}-0${(i%9)+1}-01`,
  localizacao: ['SP','RJ','BH','POA','Recife'][i%5]
}))

export const projects: Project[] = [
  {id:'p1',nome:'Portal Cliente',cliente:'Empresa A',status:'Em dia',progresso:78,orcamento:800000,gasto:400000,deadline:'2026-11-30',fase:'Desenvolvimento',equipe:['u1','u2','u3']},
  {id:'p2',nome:'ERP Modernização',cliente:'Empresa B',status:'Em risco',progresso:45,orcamento:1200000,gasto:900000,deadline:'2026-09-10',fase:'Implementação',equipe:['u4','u5']},
  {id:'p3',nome:'Data Lake',cliente:'Empresa C',status:'Atrasado',progresso:32,orcamento:600000,gasto:500000,deadline:'2026-06-01',fase:'Infraestrutura',equipe:['u6','u7','u8']},
  {id:'p4',nome:'App Mobile',cliente:'Empresa D',status:'Em dia',progresso:90,orcamento:400000,gasto:300000,deadline:'2026-12-15',fase:'Entrega',equipe:['u9','u10']},
  {id:'p5',nome:'BI Dashboard',cliente:'Empresa E',status:'Concluído',progresso:100,orcamento:300000,gasto:300000,deadline:'2026-03-01',fase:'Operação',equipe:['u11','u12']},
  {id:'p6',nome:'Segurança Cloud',cliente:'Empresa F',status:'Em dia',progresso:55,orcamento:700000,gasto:350000,deadline:'2026-10-20',fase:'Planejamento',equipe:['u13','u14','u15']}
]

// create ~40 tools
const toolNames = ['React','Node.js','Postgres','AWS','Docker','Kubernetes','Terraform','Grafana','Prometheus','Jenkins','Figma','PowerBI','Tableau','Spark','Databricks','Python','Go','ElasticSearch','Redis','RabbitMQ','MS Teams','Slack','GitHub','Bitbucket','Sentry','NewRelic','MongoDB','MySQL','Django','Flask','Next.js','Vite','Tailwind','Bootstrap','Jira','Confluence','Ansible','CircleCI','ArgoCD','SonarQube']

export const tools: Tool[] = toolNames.map((t,i)=>({
  id: `t${i+1}`,
  ferramenta: t,
  categoria: ['Desenvolvimento','Gestão de Projeto','Infraestrutura e DevOps','Dados e Análise','Segurança'][i%5],
  subcategoria: ['Frontend','Backend','DB','Cloud','CI/CD'][i%5],
  usoPorProjeto: {
    p1: (i%4) as 0|1|2|3,
    p2: ((i+1)%4) as 0|1|2|3,
    p3: ((i+2)%4) as 0|1|2|3,
    p4: ((i+3)%4) as 0|1|2|3,
    p5: ((i+1)%4) as 0|1|2|3,
    p6: ((i+2)%4) as 0|1|2|3
  }
}))
