'use client';

import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Copy, Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ResourceLinks({ repo }) {
    const [isHovered, setIsHovered] = useState(false);
    const [repoData, setRepoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extraer usuario y nombre del repositorio de la URL
    useEffect(() => {
        const extractRepoInfo = () => {
            try {
                const urlParts = new URL(repo).pathname.split('/').filter(Boolean);
                if (urlParts.length >= 2) {
                    return `${urlParts[0]}/${urlParts[1]}`;
                }
                throw new Error('Invalid GitHub URL');
            } catch (err) {
                setError('Invalid GitHub URL');
                setLoading(false);
                return null;
            }
        };

        const fetchRepoData = async () => {
            const repoPath = extractRepoInfo();
            if (!repoPath) return;

            try {
                setLoading(true);
                const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch repository data');
                }
                const data = await response.json();
                setRepoData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoData();
    }, [repo]);

    const handleCopy = () => {
        navigator.clipboard.writeText(repo);
        toast.success('Repository URL copied!');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="my-6 flex flex-col sm:flex-row gap-4 rounded-md bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Contenido del repositorio */}
            <div className="flex-1">
                <motion.h3
                    className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2"
                    animate={{ scale: isHovered ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Github className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    Project Repository
                </motion.h3>

                {loading ? (
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                ) : error ? (
                    <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                ) : repoData ? (
                    <div>
                        <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                            {repoData.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {repoData.description || 'No description available.'}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                {repoData.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork className="h-4 w-4" />
                                {repoData.forks_count}
                            </span>
                            {repoData.language && (
                                <span className="text-sm">{repoData.language}</span>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Botones */}
            <div className="flex items-center gap-2">
                <Button
                    asChild
                    variant="outline"
                    className="group relative border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-md"
                >
                    <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                        aria-label="View project repository on GitHub"
                    >
                        <motion.span
                            className="relative"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Github className="h-4 w-4" />
                        </motion.span>
                        <span className="relative">View on GitHub</span>
                        <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    aria-label="Copy repository URL"
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
}