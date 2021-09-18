module.exports = {
  apps : [{
    name: 'chat-dev',
    script: './htdocs/server-build.js',
    instances: 1,
    error_file: './logs/std-err.log',
    out_file: './logs/std-out.log',
    log_date_format: 'MM-DD-YYYY HH:mm: Z',
    autorestart: true,
    watch_delay: 1000,
    watch: ["htdocs"],
    ignore_watch: ["logs", "node_modules", "examples", "client", "server", "utils", "webpack*"],
    max_memory_restart: '1G',
    source_map_support: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'chat-prod',
    script: './htdocs/server-build.js',
    instances: 1,
    error_file: './logs/std-err.log',
    out_file: './logs/std-out.log',
    log_date_format: 'MM-DD-YYYY HH:mm: Z',
    autorestart: true,
    watch_delay: 1000,
    watch: false,
    max_memory_restart: '1G',
    source_map_support: false,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
