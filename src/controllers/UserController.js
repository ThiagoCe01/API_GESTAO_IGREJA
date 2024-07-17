import { members, generateUniqueId } from '../models/members.js';
import financeiro from '../models/financeiro.js';
const path = require('path');
async function getMembers(req, res) {
  const Newmembers = await members.find();
  return res.status(200).json(Newmembers);
}
async function getMember(req, res) {
  try {
      const member = await members.findOne({ _id: req.params.id });
      if (member) {
          res.status(200).json(member);
      } else {
          res.status(404).json({ message: 'Membro não encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar membro', error });
  }
}

async function getMemberschek(req, res) {
  return res.status(200).json("Api ok");
}

async function postMembers(req, res) {
  console.log(req.body)
  try {
    const _id = await generateUniqueId();
    const NovoMembro = new members({ _id, ...req.body });
    await NovoMembro.save();
    res.status(201).json(NovoMembro);
  } catch (erro) {
    res.status(500).json({ erro: "Dados não lançados", mongo: erro.message });
    console.error(erro);
  }
}

async function deleteMembers(req, res) {
  try {
    const { id } = req.params;
    await members.findByIdAndDelete(id);
    res.status(200).send("Membro deletado");
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível excluir os dados" });
    console.log(erro);
  }
}

async function putMembers(req, res) {
  try {
    const { id } = req.params;
    await members.findByIdAndUpdate(id, req.body);
    res.send("Dados atualizados");
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível atualizar os dados" });
    console.log(erro);
  }
}

async function getfinance(req, res) {
  const NewLancamento = await financeiro.find();
  return res.status(200).json(NewLancamento);
}

onst postfinance = async (req, res) => {
  try {
    const { dataderegistro, tipodedado, valor, statuspagamento, datapagamento, tipolancamento, observacao } = req.body;
    const file = req.file;

    // Verifica se o arquivo foi enviado
    if (!file) {
      return res.status(400).json({ erro: "Arquivo comprovante é obrigatório" });
    }

    // Cria o documento Financeiro
    const novoLancamento = new Financeiro({
      dataderegistro,
      tipodedado,
      valor,
      statuspagamento,
      datapagamento,
      tipolancamento,
      observacao,
      comprovante: {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    // Salva o documento no banco de dados
    await novoLancamento.save();

    // Retorna o documento salvo como resposta
    res.status(201).json(novoLancamento);
  } catch (error) {
    res.status(500).json({ erro: "Dados não lançados", mongo: error.message });
    console.error(error);
  }
};

async function deletefinance(req, res) {
  try {
    const { id } = req.params;
    await financeiro.findByIdAndDelete(id);
    res.status(200).send("Lançamento deletado");
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível excluir os dados" });
    console.log(erro);
  }
}

async function putfinance(req, res) {
  try {
    const { id } = req.params;
    await financeiro.findByIdAndUpdate(id, req.body);
    res.send("Dados atualizados");
  } catch (erro) {
    res.status(500).json({ erro: "Não foi possível atualizar os dados" });
    console.log(erro);
  }
}

export { getMember, getMemberschek, getMembers, postMembers, deleteMembers, putMembers, getfinance, postfinance, deletefinance, putfinance };
