const tools = [
    {
      type: 'function',
      function: {
        name: 'queryDatabase',
        description: 'Executa apenas queries SELECT em tabelas públicas: `clients`. Não suporta DELETE, INSERT ou UPDATE.',
        parameters: {
          type: 'object',
          properties: {
            sql: { type: 'string', description: 'SQL SELECT a executar' }
          },
          required: ['sql']
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'notifyAdmin',
        description: 'Envia uma mensagem direta ao admin no Discord.',
        parameters: {
          type: 'object',
          properties: {
            mensagem: { type: 'string', description: 'Mensagem a enviar ao admin' }
          },
          required: ['mensagem']
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'getRandomCat',
        description: 'Gera uma imagem aleatória de um gato.',
        parameters: {
          type: 'object',
          properties: {},
          required: []
        }
      }
    }
];

export { tools };