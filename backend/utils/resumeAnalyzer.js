const crypto = require('crypto');
const AtsSettings = require('../models/AtsSettings');

const analyzeResume = async (content) => {
    // Get ATS settings from the database
    const settings = await AtsSettings.getSingleton();
    const { intensity, keywords } = settings;

    const atsScore = await calculateATSScore(content, intensity, keywords);
    const suggestions = await generateSuggestions(content, intensity, keywords);

    return { atsScore, suggestions };
};

const calculateATSScore = async (content, intensity = 50, customKeywords = []) => {
    let score = 0;
    const totalPoints = 100; // Maximum possible score
    
    // Core criteria with weighted scoring
    const criteria = [
        { regex: /skills?|expertise|proficienc(y|ies)/i, weight: 15 }, // Skills section
        { regex: /experience|work|history|employment/i, weight: 15 }, // Experience
        { regex: /education|degree|qualification/i, weight: 15 }, // Education
        { regex: /projects?|portfolio/i, weight: 10 }, // Projects
        { regex: /achievements?|accomplishments?/i, weight: 10 }, // Achievements
        { regex: /contact|email|phone|linked\s*in/i, weight: 15 }, // Contact info
        { regex: /summary|profile|objective/i, weight: 10 }, // Summary
        { regex: /certifications?|qualifications?/i, weight: 5 }, // Certifications
        { regex: /.{250,}/i, weight: 5 } // Minimum content length
    ];

    // Calculate score based on criteria
    criteria.forEach(criterion => {
        if (content.match(criterion.regex)) {
            score += criterion.weight;
        }
    });

    // Bonus points for additional content quality (up to 15 points)
    if (content.length > 500) score += 5;
    if (content.match(/(\d+\s*(years?|yrs?))/i)) score += 5; // Quantified experience
    if (content.match(/(led|managed|developed|created|implemented)/i)) score += 5; // Action verbs

    // Check for custom keywords defined by admin
    if (customKeywords && customKeywords.length > 0) {
        // Track found and missing keywords
        const keywordsFoundCount = customKeywords.filter(keyword => {
            try {
                // Escape special regex characters but keep the symbols in the keyword
                const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(escapedKeyword, 'i'); // Case insensitive matching
                return content.toLowerCase().match(regex);
            } catch (error) {
                console.error(`Invalid keyword regex: ${keyword}`, error);
                return false;
            }
        }).length;
        
        const keywordsMissingCount = customKeywords.length - keywordsFoundCount;
        
        // Add bonus points for each keyword found (max 20 points)
        const keywordBonus = Math.min(keywordsFoundCount * 5, 20);
        score += keywordBonus;
        
        // Subtract points for missing keywords (max 20 points deduction)
        const keywordPenalty = Math.min(keywordsMissingCount * 5, 20);
        score -= keywordPenalty;
    }

    // Apply intensity factor - higher intensity means stricter scoring
    const intensityFactor = intensity / 50; // 0.0 to 2.0
    score = score / intensityFactor;

    // Ensure score stays within 0-100 range
    return Math.min(Math.max(Math.round(score), 0), 100);
};

const generateSuggestions = async (content, intensity = 50, customKeywords = []) => {
    const suggestions = [];
    const contentLower = content.toLowerCase();

    // Skills Section Check
    if (!contentLower.match(/skills?|expertise|proficienc(y|ies)|technical|competencies/i)) {
        suggestions.push('Add a dedicated skills section highlighting your core competencies relevant to your field.');
    } else if (!contentLower.match(/\b(proficient|experienced|skilled|knowledgeable)\b.*\b(in|with)\b/i)) {
        suggestions.push('Use strong action words to describe your skill proficiency levels.');
    }

    // Experience Section Check
    if (!contentLower.match(/experience|work|history|employment/i)) {
        suggestions.push('Include your work experience with specific roles and responsibilities.');
    } else if (!contentLower.match(/\b(led|managed|developed|created|implemented|improved|increased|decreased|reduced|achieved)\b/i)) {
        suggestions.push('Use strong action verbs to describe your work achievements and responsibilities.');
    }

    // Education Section Check
    if (!contentLower.match(/education|degree|qualification|graduate|bachelor|master|phd/i)) {
        suggestions.push('Add your educational qualifications with relevant details.');
    }

    // Projects Section Check
    if (!contentLower.match(/projects?|portfolio/i)) {
        suggestions.push('Include relevant projects that demonstrate your practical skills and achievements.');
    } else if (!contentLower.match(/\b(technologies|tools|methodology|results|outcome)\b/i)) {
        suggestions.push('Enhance your project descriptions with technologies used and quantifiable results.');
    }

    // Achievements Section Check
    if (!contentLower.match(/achievements?|accomplishments?|awards?|recognitions?/i)) {
        suggestions.push('Add notable achievements, awards, or recognition to showcase your success.');
    }

    // Contact Information Check
    if (!contentLower.match(/email|phone|contact|linked\s*in|github/i)) {
        suggestions.push('Ensure all professional contact information is included and easily accessible.');
    }

    // Summary/Profile Check
    if (!contentLower.match(/summary|profile|objective|about/i)) {
        suggestions.push('Add a concise professional summary highlighting your career focus and key strengths.');
    }

    // Content Length and Quality Check
    if (content.length < 300) {
        suggestions.push('Your resume seems too brief. Add more detailed information about your experience and skills.');
    } else if (content.length > 3000) {
        suggestions.push('Consider condensing your resume to focus on the most relevant and recent information.');
    }

    // Keywords and Formatting Check
    if (!contentLower.match(/\b(responsible|responsibilities|duties)\b/i)) {
        suggestions.push('Include relevant keywords and phrases from the job description you\'re targeting.');
    }

    // Metrics and Quantification Check
    if (!content.match(/\d+%|\d+\s*(years?|yrs?|people|teams?|projects?|clients?|customers?)/i)) {
        suggestions.push('Add quantifiable achievements and metrics to demonstrate your impact.');
    }
    
    // Custom keywords suggestions
    if (customKeywords && customKeywords.length > 0) {
        const missingKeywords = customKeywords.filter(keyword => {
            try {
                // Escape special regex characters but keep the symbols in the keyword
                const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(escapedKeyword, 'i'); // Case insensitive matching
                return !content.toLowerCase().match(regex);
            } catch (error) {
                console.error(`Invalid keyword regex: ${keyword}`, error);
                return true; // Consider it missing if regex is invalid
            }
        });
        
        if (missingKeywords.length > 0) {
            const keywordsList = missingKeywords.join(', ');
            suggestions.push(`Consider adding these keywords to your resume: ${keywordsList}`);
        }
    }
    
    // Adjust number of suggestions based on intensity
    // Higher intensity = more strict = more suggestions
    const numberOfSuggestions = Math.min(Math.round(suggestions.length * (intensity / 50)), suggestions.length);
    
    // Filter out duplicate suggestions and limit based on intensity
    return [...new Set(suggestions)].slice(0, numberOfSuggestions);
};

const generateHash = (content) => {
    return crypto.createHash('sha256').update(content).digest('hex');
};

module.exports = { analyzeResume, generateHash };