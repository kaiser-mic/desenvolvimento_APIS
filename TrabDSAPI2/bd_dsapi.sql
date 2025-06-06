-- Os Inserts foram criados com inteligencia artificial, com o objetivo de criar um banco de dados para uma API de pedidos.


create database bd_dsapi;
use bd_dsapi;
CREATE TABLE cidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    altura DECIMAL(5,2),
    nascim DATE,
    cidade_id INT,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2),
    quantidade DECIMAL(10,2),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    horario DATETIME,
    endereco VARCHAR(200),
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedidos_produtos (
    pedido_id INT,
    produto_id INT,
    preco DECIMAL(10,2),
    quantidade DECIMAL(10,2),
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Tabela: cidades
INSERT INTO cidades (nome) VALUES
('São Paulo'),
('Rio de Janeiro');

-- Tabela: clientes
INSERT INTO clientes (nome, altura, nascim, cidade_id) VALUES
('João Silva', 1.75, '1990-05-20', 1),
('Maria Souza', 1.62, '1985-10-15', 2);

-- Tabela: categorias
INSERT INTO categorias (nome) VALUES
('Eletrônicos'),
('Roupas');

-- Tabela: produtos
INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES
('Smartphone', 1500.00, 10, 1),
('Camiseta', 50.00, 100, 2);

-- Tabela: pedidos
INSERT INTO pedidos (horario, endereco, cliente_id) VALUES
('2025-05-24 14:30:00', 'Rua das Flores, 123', 1),
('2025-05-25 09:00:00', 'Av. Central, 456', 2);

-- Tabela: pedidos_produtos
INSERT INTO pedidos_produtos (pedido_id, produto_id, preco, quantidade) VALUES
(1, 1, 1500.00, 1),
(2, 2, 50.00, 2);
