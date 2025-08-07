'use client';

import React, { useState } from 'react';
import { Sparkles, Lightbulb, Target, Hash, Copy, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SocialNetwork, PostObjective } from '@/types';
import { SOCIAL_NETWORKS, POST_OBJECTIVES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AISuggestionsProps {
  className?: string;
  onSuggestionSelect?: (type: 'idea' | 'cta' | 'hashtags', content: string | string[]) => void;
}

interface Suggestion {
  type: 'idea' | 'cta' | 'hashtags';
  content: string | string[];
  context?: {
    socialNetwork?: SocialNetwork;
    objective?: PostObjective;
  };
}

const AISuggestions: React.FC<AISuggestionsProps> = ({
  className,
  onSuggestionSelect
}) => {
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState<SocialNetwork>('instagram');
  const [selectedObjective, setSelectedObjective] = useState<PostObjective>('engagement');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI suggestions - In a real app, this would call an AI API
  const generateSuggestions = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockSuggestions: Suggestion[] = [
      {
        type: 'idea',
        content: getIdeaSuggestion(selectedSocialNetwork, selectedObjective),
        context: { socialNetwork: selectedSocialNetwork, objective: selectedObjective }
      },
      {
        type: 'cta',
        content: getCTASuggestion(selectedObjective),
        context: { objective: selectedObjective }
      },
      {
        type: 'hashtags',
        content: getHashtagSuggestions(selectedSocialNetwork, selectedObjective),
        context: { socialNetwork: selectedSocialNetwork, objective: selectedObjective }
      }
    ];

    setSuggestions(mockSuggestions);
    setIsLoading(false);
  };

  const getIdeaSuggestion = (socialNetwork: SocialNetwork, objective: PostObjective): string => {
    const ideas = {
      instagram: {
        engagement: 'Compartilhe um "antes e depois" da sua jornada ou projeto, mostrando a evolução e pedindo para o público compartilhar as próprias experiências.',
        awareness: 'Crie um carrossel explicando "5 mitos" sobre o seu nicho, desmistificando conceitos e estabelecendo sua autoridade no assunto.',
        conversion: 'Mostre um problema comum do seu público e apresente sua solução de forma visual, com um call-to-action claro para conhecer mais.',
        education: 'Faça um tutorial rápido em formato de carrossel ou reels, ensinando algo útil relacionado ao seu nicho.',
        entertainment: 'Crie um quiz interativo nos stories sobre temas do seu nicho, depois compartilhe as respostas no feed.',
        community: 'Faça uma pergunta genuína sobre desafios que seu público enfrenta e responda sinceramente nos comentários.'
      },
      linkedin: {
        engagement: 'Compartilhe uma lição profissional que aprendeu recentemente, contando a história por trás do aprendizado.',
        awareness: 'Publique suas reflexões sobre uma tendência do mercado, demonstrando seu conhecimento e visão estratégica.',
        conversion: 'Conte um case de sucesso (próprio ou de cliente) mostrando resultados concretos e a metodologia usada.',
        education: 'Escreva um post didático sobre um conceito importante da sua área, tornando-o acessível para iniciantes.',
        entertainment: 'Compartilhe uma anedota profissional divertida que outros possam se identificar.',
        community: 'Inicie uma discussão sobre um desafio comum da indústria, pedindo insights dos colegas.'
      },
      tiktok: {
        engagement: 'Crie um vídeo "POV" sobre uma situação engraçada ou relatable do seu nicho.',
        awareness: 'Faça um vídeo "Get Ready With Me" mostrando sua rotina profissional ou criativa.',
        conversion: 'Crie um vídeo "things you didn\'t know about [seu produto/serviço]".',
        education: 'Faça um tutorial rápido de 30 segundos sobre algo útil.',
        entertainment: 'Participe de uma trend atual adaptando para o seu nicho.',
        community: 'Responda uma pergunta do público em formato de vídeo informal.'
      },
      facebook: {
        engagement: 'Compartilhe uma reflexão pessoal sobre como seu trabalho impacta positivamente as pessoas.',
        awareness: 'Publique um post sobre os bastidores do seu negócio ou projeto.',
        conversion: 'Crie um post sobre um problema comum e como você pode ajudar a resolvê-lo.',
        education: 'Compartilhe um artigo ou infográfico educativo sobre seu nicho.',
        entertainment: 'Publique uma foto interessante com uma história por trás.',
        community: 'Crie uma enquete sobre preferências relacionadas ao seu nicho.'
      },
      twitter: {
        engagement: 'Tweet uma hot take (opinião polêmica mas respeitosa) sobre seu nicho.',
        awareness: 'Compartilhe uma thread sobre sua jornada profissional.',
        conversion: 'Tweet sobre um problema específico e como você resolve.',
        education: 'Crie uma thread didática sobre um conceito importante.',
        entertainment: 'Tweet algo engraçado relacionado ao seu nicho.',
        community: 'Faça uma pergunta que gere discussão entre seus seguidores.'
      },
      youtube: {
        engagement: 'Crie um vídeo reagindo a comentários ou dúvidas dos inscritos.',
        awareness: 'Grave um "day in my life" mostrando como é trabalhar na sua área.',
        conversion: 'Faça um vídeo comparativo mostrando antes e depois de usar sua solução.',
        education: 'Crie um tutorial passo a passo sobre algo relevante.',
        entertainment: 'Grave um vídeo de desafio ou experimento relacionado ao seu nicho.',
        community: 'Faça um Q&A respondendo perguntas da audiência.'
      },
      pinterest: {
        engagement: 'Crie um pin com "10 dicas" sobre seu nicho em formato visualmente atrativo.',
        awareness: 'Projete um infográfico sobre sua jornada ou metodologia.',
        conversion: 'Crie um pin "antes e depois" mostrando transformações.',
        education: 'Faça um pin educativo tipo "guia passo a passo".',
        entertainment: 'Crie um board temático com inspirações do seu nicho.',
        community: 'Faça pins com citações inspiradoras relacionadas à sua área.'
      }
    };

    return ideas[socialNetwork][objective];
  };

  const getCTASuggestion = (objective: PostObjective): string => {
    const ctas = {
      engagement: [
        'O que vocês acham? Compartilhem nos comentários! 💬',
        'Marquem alguém que precisa ver isso! 👥',
        'Qual foi a experiência de vocês? Contem aqui! ✨',
        'Salvem este post para não esquecer! 📌',
        'Concordam? Discordam? Quero saber a opinião! 🤔'
      ],
      awareness: [
        'Sigam para mais conteúdos como este! 🔔',
        'Compartilhem se concordam! 🔄',
        'Salvem para revisar depois! 💾',
        'O que mais gostariam de saber sobre este tema? 🤓',
        'Marquem quem também se beneficiaria desta informação! 📢'
      ],
      conversion: [
        'Link na bio para saber mais! 🔗',
        'Mandem DM para conversarmos! 📱',
        'Comentem "QUERO" para receber mais detalhes! 💬',
        'Cliquem no link para conhecer nossa solução! ➡️',
        'Agendem uma conversa gratuita - link na bio! 📅'
      ],
      education: [
        'Salvem para consultar quando precisarem! 📚',
        'Compartilhem com quem está aprendendo! 🎓',
        'Que parte acham mais útil? Comentem! 💡',
        'Qual tópico querem que eu explique em seguida? 🤔',
        'Marquem alguém que precisa aprender isso! 👨‍🏫'
      ],
      entertainment: [
        'Riam comigo nos comentários! 😂',
        'Marquem o amigo que faria isso! 😆',
        'Qual situação mais se identificam? 🤣',
        'Compartilhem se acharam engraçado! 😄',
        'Contem suas histórias similares! 🎭'
      ],
      community: [
        'Vamos construir essa discussão juntos! 🤝',
        'Compartilhem suas experiências aqui! 🗣️',
        'Que tal criarmos uma corrente de apoio? 💪',
        'Marquem alguém da nossa comunidade! 👥',
        'Juntos somos mais fortes! Comentem! 🌟'
      ]
    };

    const optionsForObjective = ctas[objective];
    return optionsForObjective[Math.floor(Math.random() * optionsForObjective.length)];
  };

  const getHashtagSuggestions = (socialNetwork: SocialNetwork, objective: PostObjective): string[] => {
    const baseHashtags = {
      instagram: ['#instagram', '#insta', '#instagood', '#photooftheday'],
      linkedin: ['#linkedin', '#professional', '#career', '#business'],
      tiktok: ['#tiktok', '#viral', '#fyp', '#trending'],
      facebook: ['#facebook', '#community', '#share', '#connect'],
      twitter: ['#twitter', '#tweet', '#discussion', '#thoughts'],
      youtube: ['#youtube', '#video', '#subscribe', '#content'],
      pinterest: ['#pinterest', '#inspiration', '#ideas', '#creative']
    };

    const objectiveHashtags = {
      engagement: ['#engagement', '#comunidade', '#interacao', '#dialogo', '#participacao'],
      awareness: ['#brand', '#marca', '#awareness', '#visibilidade', '#conhecimento'],
      conversion: ['#vendas', '#leads', '#conversao', '#resultado', '#negocio'],
      education: ['#educacao', '#aprendizado', '#dicas', '#tutorial', '#conhecimento'],
      entertainment: ['#diversao', '#entretenimento', '#humor', '#viral', '#trend'],
      community: ['#comunidade', '#network', '#conexao', '#relacionamento', '#apoio']
    };

    const generalHashtags = [
      '#conteudo', '#digital', '#marketing', '#criativo', '#inovacao',
      '#estrategia', '#sucesso', '#crescimento', '#inspiracao', '#motivacao'
    ];

    return [
      ...baseHashtags[socialNetwork].slice(0, 2),
      ...objectiveHashtags[objective].slice(0, 3),
      ...generalHashtags.slice(0, 3)
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    onSuggestionSelect?.(suggestion.type, suggestion.content);
  };

  return (
    <Card variant="glass" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <span>Sugestões de IA</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Rede Social</label>
            <select
              value={selectedSocialNetwork}
              onChange={(e) => setSelectedSocialNetwork(e.target.value as SocialNetwork)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(SOCIAL_NETWORKS).map(([key, network]) => (
                <option key={key} value={key}>
                  {network.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Objetivo</label>
            <select
              value={selectedObjective}
              onChange={(e) => setSelectedObjective(e.target.value as PostObjective)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(POST_OBJECTIVES).map(([key, objective]) => (
                <option key={key} value={key}>
                  {objective.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          variant="primary"
          onClick={generateSuggestions}
          isLoading={isLoading}
          className="w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Gerar Sugestões
        </Button>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {suggestion.type === 'idea' && <Lightbulb className="h-4 w-4 text-yellow-400" />}
                    {suggestion.type === 'cta' && <Target className="h-4 w-4 text-green-400" />}
                    {suggestion.type === 'hashtags' && <Hash className="h-4 w-4 text-blue-400" />}
                    <span className="text-sm font-medium capitalize">
                      {suggestion.type === 'cta' ? 'Call to Action' : suggestion.type === 'hashtags' ? 'Hashtags' : 'Ideia'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(
                        Array.isArray(suggestion.content) 
                          ? suggestion.content.join(' ') 
                          : suggestion.content
                      )}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      Usar
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-slate-300">
                  {Array.isArray(suggestion.content) ? (
                    <div className="flex flex-wrap gap-2">
                      {suggestion.content.map((item, i) => (
                        <span
                          key={i}
                          className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>{suggestion.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {suggestions.length === 0 && !isLoading && (
          <div className="text-center py-8 text-slate-400">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Clique em "Gerar Sugestões" para receber ideias personalizadas!</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Gerando sugestões personalizadas...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
