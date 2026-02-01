// PDF Generator for All Weeks
class MaatPDFGenerator {
    constructor(weekNumber, weekTitle, primaryColor) {
        this.week = weekNumber;
        this.title = weekTitle;
        this.color = primaryColor;
        this.exercises = [];
    }
    
    addExercise(question, answer) {
        this.exercises.push({ question, answer });
    }
    
    generateCertificate(name = 'Student') {
        const date = new Date().toLocaleDateString();
        return `
            ╔══════════════════════════════════════════════════╗
            ║          THE HALL OF TRUTH INITIATION           ║
            ║                                                  ║
            ║           Certificate of Completion             ║
            ║                                                  ║
            ║  This certifies that                            ║
            ║  ${name}                                        ║
            ║                                                  ║
            ║  has successfully completed                     ║
            ║  ${this.title}                                  ║
            ║  Week ${this.week} of the 42 Declarations       ║
            ║                                                  ║
            ║  Date: ${date}                                  ║
            ║                                                  ║
            ║  Walk in Truth, Live in Ma'at                   ║
            ╚══════════════════════════════════════════════════╝
        `;
    }
    
    generateWorkbookPDF() {
        let content = `WEEK ${this.week} WORKBOOK: ${this.title}\n`;
        content += '='.repeat(60) + '\n\n';
        
        this.exercises.forEach((ex, index) => {
            content += `Exercise ${index + 1}: ${ex.question}\n`;
            content += `Answer: ${ex.answer}\n`;
            content += '-'.repeat(40) + '\n\n';
        });
        
        content += '\n\n' + this.generateCertificate();
        
        return content;
    }
    
    downloadPDF(filename) {
        const content = this.generateWorkbookPDF();
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `Week${this.week}_Workbook.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Usage in each workbook:
function generateWeekPDF(weekNumber) {
    const generator = new MaatPDFGenerator(
        weekNumber,
        getWeekTitle(weekNumber),
        getWeekColor(weekNumber)
    );
    
    // Collect exercises from page
    document.querySelectorAll('.exercise').forEach(exercise => {
        const question = exercise.querySelector('h4')?.textContent || 'Exercise';
        const answer = Array.from(exercise.querySelectorAll('textarea, input[type="text"]'))
            .map(el => el.value)
            .join(', ');
        
        if (answer) generator.addExercise(question, answer);
    });
    
    generator.downloadPDF();
}

function getWeekTitle(week) {
    const titles = {
        1: 'The Purity of Heart Inventory',
        2: 'The Scales of Right Action',
        3: 'The Balance of Opposites',
        4: 'The Discernment Temple',
        5: 'The Sacred Respect Ritual',
        6: 'The Strength Decree',
        7: 'The Completion Ceremony'
    };
    return titles[week] || 'Unknown Week';
}

function getWeekColor(week) {
    const colors = {
        1: '#4CAF50',
        2: '#D4AF37',
        3: '#6C8CD5',
        4: '#9B59B6',
        5: '#E74C3C',
        6: '#F39C12',
        7: '#1ABC9C'
    };
    return colors[week] || '#000000';
}
